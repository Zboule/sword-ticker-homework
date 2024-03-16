import { useState, useCallback } from "react";
import type { File } from "./model";

export const useSelection = (files: File[]) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const availableFiles = files
    .filter((file) => file.status === "available")
    .map((file) => file.path);

  const isAllSelected = selectedFiles.size === availableFiles.length;
  const isSomeSelected =
    selectedFiles.size > 0 && selectedFiles.size < availableFiles.length;

  const toggleSelection = useCallback((file: File) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = new Set(prevSelectedFiles);
      if (newSelectedFiles.has(file.path)) {
        newSelectedFiles.delete(file.path);
      } else {
        newSelectedFiles.add(file.path);
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
    isSomeSelected,
    toggleSelection,
    selectAll,
  };
};
