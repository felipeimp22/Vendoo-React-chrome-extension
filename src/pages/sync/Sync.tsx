import React, { useEffect, useState } from "react";
import "@pages/sync/Sync.scss";
import { BaseMessage } from "@src/types";
import { MESSAGING_PORT } from "@src/common";
import useLocalStorage from "@src/hooks/useLocalStorage";

const port = chrome.runtime.connect({ name: MESSAGING_PORT });

const SyncPage = () => {
  const [itemsCached, setItemsCached] = useLocalStorage("items");
  const [cachedStoreName, setCachedStoreName] = useLocalStorage("storeName");
  const [items, setItems] = useState(itemsCached);
  const [currentPage, setCurrentPage] = useState(0); // Page number starts from 0 as per your JSON
  const [totalPages, setTotalPages] = useState(0);
  const [storename, setStorename] = useState(cachedStoreName);
  const [totalItems, setTotalItems] = useState(0);

  const handleSendMessage = (storename = "", page = 1) => {
    port.postMessage({
      type: "fetch",
      storename,
      page,
    } as BaseMessage);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storename = e.currentTarget.storename.value;
    setCachedStoreName(storename);
    setStorename(storename);
    handleSendMessage(storename);
  };

  const handleMessages = (message) => {
    if (message.type === "fetch") {

      const data = message.items;
      setItems(data);
      setItemsCached(data);
      setCurrentPage(data.page);
      setTotalPages(data.nbPages);
      setTotalItems(data.nbHits)
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber <= 0) pageNumber = 1;
    setCurrentPage(pageNumber);
    handleSendMessage(storename, pageNumber);
  };

  useEffect(() => {
    if (itemsCached) {
      setItems(itemsCached);
      setCurrentPage(itemsCached.page);
      setTotalPages(itemsCached.nbPages);
      setStorename(cachedStoreName);
      setTotalItems(itemsCached.nbHits)

    }
    port.onMessage.addListener(handleMessages);

    return () => port.onMessage.removeListener(handleMessages);
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>Type storename here</div>
        <input
          type="text"
          name="storename"
          defaultValue={
            storename && storename !== "" ? storename : "JURAVEL_VINTAGE"
          }
        />
        <small>Eg.: https://www.grailed.com/[storenamehere]</small>
        <button type="submit">Sync</button>
      </form>
      <h4>Total Item: <bold>{totalItems}</bold> </h4>
      <div className="Results-section">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Title</th>
              <th>Price</th>
              <th>Condition</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {items?.hits?.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.cover_photo.url}
                    alt="item"
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  {item.condition
                    ? item.condition.replace("is_", "").replace("_", " ")
                    : "Unknown"}
                </td>
                <td>{item.size || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              disabled={i === currentPage}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyncPage;
