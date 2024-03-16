import { useState, useCallback } from "react";
import type { File } from "../models/model";

export const useSelection = (files: File[]) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<File>>(new Set());

  const availableFiles = files.filter((file) => file.status === "available");
  const isAllSelected =
    availableFiles.length > 0 && selectedFiles.size === availableFiles.length;
  const isAnySelected = selectedFiles.size > 0;
  const isSomeSelected =
    selectedFiles.size > 0 && selectedFiles.size < availableFiles.length;

  const toggleSelection = useCallback((file: File) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = new Set(prevSelectedFiles);
      if (newSelectedFiles.has(file)) {
        newSelectedFiles.delete(file);
      } else {
        newSelectedFiles.add(file);
      }
      return newSelectedFiles;
    });
  }, []);

  const selectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(availableFiles));
    }
  }, [isAllSelected, availableFiles]);

  return {
    selectedFiles,
    isAllSelected,
    isAnySelected,
    isSomeSelected,
    toggleSelection,
    selectAll,
  };
};
