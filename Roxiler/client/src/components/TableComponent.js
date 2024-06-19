// src/components/TableComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const TableComponent = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState('January');
  const [statistics, setStatistics] = useState({
    totalSalesAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const months = moment.months();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/transactions', {
        params: {
          search,
          page,
          perPage,
          month,
        },
      });
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setProducts([]);
    setTotal(0);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/statistics/${month}`);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchStatistics();
  }, [search, page, perPage, month]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Product Transactions for {month}</h2>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">
            Select Month:
            <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
              {months.map((monthName) => (
                <option key={monthName} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Statistics</h5>
              <div>Total Sales Amount: {statistics.totalSalesAmount}</div>
              <div>Total Sold Items: {statistics.totalSoldItems}</div>
              <div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped table-hover table-bordered" style={{ background: '#007bff', color: 'white' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>
              <li className={`page-item ${page * perPage >= total ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col">
          <label className="form-label">
            Items per page:
            <select
              className="form-select"
              value={perPage}
              onChange={(e) => setPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
