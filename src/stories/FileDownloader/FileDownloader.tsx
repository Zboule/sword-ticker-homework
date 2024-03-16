import React, { useEffect, useRef } from "react";
import type { File } from "./model";
import styles from "./FileDownloader.module.css";
import { FileRow } from "./FileRow";
import { useSelection } from "./useSelection";

interface FileDownloaderProps {
  files: File[];
}

export const FileDownloader: React.FC<FileDownloaderProps> = ({ files }) => {
  const {
    selectedFiles,
    isAllSelected,
    isSomeSelected,
    toggleSelection,
    selectAll,
  } = useSelection(files);
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isSomeSelected;
    }
  }, [isSomeSelected]);

  const downloadSelected = () => {
    const selectedFileDetails = Array.from(selectedFiles).map(
      (fileName) => files.find((file) => file.name === fileName) as File
    );

    alert(
      JSON.stringify(
        selectedFileDetails.map(({ path, device }) => ({ path, device })),
        null,
        2
      )
    );
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.selectAll}>
          <input
            type="checkbox"
            ref={selectAllRef}
            checked={isAllSelected}
            onChange={selectAll}
          />
          {selectedFiles.size > 0
            ? `Selected ${selectedFiles.size}`
            : "None Selected"}
        </div>

        <button
          className={styles.downloadButton}
          onClick={downloadSelected}
          disabled={selectedFiles.size === 0}
        >
          Download Selected
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <FileRow
              key={file.name}
              file={file}
              isSelected={selectedFiles.has(file.path)}
              onSelectionChange={(file) => {
                console.log("From here");
                toggleSelection(file);
              }}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
