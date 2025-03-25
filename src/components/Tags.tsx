import { Chip } from "@mui/material";
import { ActionStatus } from "../utils/common.types";
import React from "react";

interface TagsProps {
  status: ActionStatus;
}

export const Tags: React.FC<TagsProps> = ({ status }) => {
  const statusColors: Record<
    string,
    {
      label: string;
      color: "default" | "success" | "error" | "warning" | "info";
    }
  > = {
    Pendiente: { label: "Pendiente", color: "warning" },
    Completado: { label: "Completado", color: "success" },
    Canceado: { label: "Cancelado", color: "error" },
    En_proceso: { label: "En proceso", color: "info" },
  };

  const { label, color } = statusColors[status] || {
    label: status,
    color: "default",
  };

  return <Chip label={label} color={color} />;
};
