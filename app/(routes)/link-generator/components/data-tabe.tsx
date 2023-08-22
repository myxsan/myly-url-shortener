"use client";

import { Link } from "@/stores/links";
import { Link as LinkButton } from "@mui/icons-material";
import { Box, Button, Typography, styled } from "@mui/material";
import { DataGrid as MuiDataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface DataTableProps {
  data: Link[];
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  const DataGrid = styled(MuiDataGrid)(() => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },
  }));
  const [rows, setRows] = useState<any[]>([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "", width: 40, align: "center" },
    {
      field: "src",
      headerName: "Source",
      flex: 1,
    },
    {
      field: "router",
      width: 200,
      headerName: "Short Link",
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            startIcon={<LinkButton />}
            onClick={() => {
              navigator.clipboard.writeText(params.value);
            }}
          >
            <Typography textTransform="none" fontSize={15}>
              Copy Link
            </Typography>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    if (loading) return;
    setRows(
      data.map((item) => ({
        id: data.indexOf(item) + 1,
        src: item.src,
        router: item.routerLink,
      }))
    );
  }, [data, loading]);
  if (loading) return null;

  return (
    <Box sx={{ height: 400, width: "100%" }} mt={5}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        rowSelection={false}
      />
    </Box>
  );
};

export default DataTable;
