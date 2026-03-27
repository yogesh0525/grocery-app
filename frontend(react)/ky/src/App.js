import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const API = "http://localhost:8080/grocery";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    axios.get(API).then(res => setItems(res.data));
  };

  // ADD / UPDATE
  const saveItem = () => {
    if (!name.trim()) {
      alert("Enter name");
      return;
    }

    const p = parseFloat(price);
    const q = parseInt(qty);

    if (isNaN(p) || isNaN(q) || p <= 0 || q <= 0) {
      alert("Enter valid price and quantity");
      return;
    }

    const data = { name, price: p, quantity: q };

    if (editId) {
      axios.put(API + "/" + editId, data)
        .then(() => {
          resetForm();
          loadItems();
        });
    } else {
      axios.post(API, data)
        .then(() => {
          resetForm();
          loadItems();
        });
    }
  };

  const editItem = (item) => {
    setName(item.name);
    setPrice(item.price);
    setQty(item.quantity);
    setEditId(item.id);
  };

  const deleteItem = (id) => {
    axios.delete(API + "/" + id).then(loadItems);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setQty("");
    setEditId(null);
  };

  // calculations
  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const remaining = (Number(budget) || 0) - total;

  return (
    <div style={styles.container}>
      <h1>🛒 Smart Grocery App</h1>

      {/* Budget */}
      <div style={styles.card}>
        <h3>Budget</h3>
        <input
          type="number"
          style={styles.input}
          placeholder="Enter Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>

      {/* Add / Edit */}
      <div style={styles.card}>
        <h3>{editId ? "Edit Item" : "Add Item"}</h3>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          style={styles.input}
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          style={styles.input}
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <button style={styles.addBtn} onClick={saveItem}>
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button style={styles.cancelBtn} onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.price}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>{item.price * item.quantity}</td>
              <td style={styles.td}>
                <button
                  style={styles.editBtn}
                  onClick={() => editItem(item)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div style={styles.summary}>
        <h3>Total: ₹{total}</h3>
        <h3>Remaining: ₹{remaining}</h3>

        {remaining < 0 && (
          <h3 style={{ color: "red" }}>
            ⚠ Budget Exceeded!
          </h3>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#f5f5f5",
    minHeight: "100vh"
  },

  card: {
    background: "white",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  },

  input: {
    margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  addBtn: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  cancelBtn: {
    padding: "10px",
    marginLeft: "10px",
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: "5px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    textAlign: "center"
  },

  th: {
    border: "1px solid #ddd",
    padding: "10px",
    background: "#f2f2f2"
  },

  td: {
    border: "1px solid #ddd",
    padding: "10px"
  },

  summary: {
    marginTop: "20px",
    padding: "10px",
    background: "white",
    borderRadius: "10px"
  },

  editBtn: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px"
  }
};

export default App;