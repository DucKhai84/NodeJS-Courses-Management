import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

const DataTableComponent = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Gọi API khi component mount
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/comments")
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch((error) => console.error("API Error:", error));
    }, []);

    // Lọc dữ liệu theo từ khóa
    useEffect(() => {
        const lowerSearch = searchText.toLowerCase();
        const result = data.filter(item =>
            item.name.toLowerCase().includes(lowerSearch) ||
            item.email.toLowerCase().includes(lowerSearch)
        );
        setFilteredData(result);
    }, [searchText, data]);

    // Cấu hình cột
    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Email",
            selector: row => row.email,
        },
        {
            name: "Comment",
            selector: row => row.body,
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách bình luận</h2>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: "10px", padding: "8px", width: "300px" }}
            />
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                paginationPerPage={100}
                highlightOnHover
                responsive
                persistTableHead
            />
        </div>
    );
};

export default DataTableComponent;
