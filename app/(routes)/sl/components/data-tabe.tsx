"use client";

import { Link as LinkType } from "@/stores/link";
import { ContentCopy, Delete, QrCode } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { DataGrid as MuiDataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import truncate from "truncate";
import QRCode from "qrcode.react";
import toast from "react-hot-toast";
import Link from "next/link";

interface DataTableProps {
  data: LinkType[];
  loading: boolean;
  deleteLink: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading, deleteLink }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [qrValue, setQrValue] = useState<string>("");

  const handleOpen = (value: string) => {
    setQrValue(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    const pngUrl = canvas
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const DataGrid = styled(MuiDataGrid)(() => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },
  }));

  const columns: GridColDef[] = [
    { field: "id", width: 40, align: "center" },
    {
      field: "src",
      flex: 1,
      renderCell: (params) => {
        const source = truncate(
          (params.value as string).split("https://www.")[1],
          40
        );

        return (
          <Link href={params.value}>
            <Typography>{source}</Typography>
          </Link>
        );
      },
    },
    {
      field: "routerLink",
      width: 30,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(params.value);
              toast("Link coppied to clipboard");
            }}
          >
            <ContentCopy />
          </IconButton>
        );
      },
    },
    {
      field: "qrCode",
      width: 30,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              handleOpen(params.value);
            }}
          >
            <QrCode />
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      width: 60,
      type: "number",
      //params have to be the id
      renderCell: (params) => {
        return (
          <IconButton color="warning" onClick={() => deleteLink(params.value)}>
            <Delete />
          </IconButton>
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
        routerLink: item.routerLink,
        qrCode: item.routerLink,
        delete: item.id,
      }))
    );
  }, [data, loading]);
  if (loading) return null;

  return (
    <>
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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "16px",
          }}
        >
          <Stack spacing={1} m={2}>
            <QRCode
              id="qr-gen"
              value={qrValue}
              size={290}
              level={"H"}
              includeMargin={true}
            />
            <Button
              variant="contained"
              color="warning"
              onClick={downloadQRCode}
            >
              Download PNG
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default DataTable;
