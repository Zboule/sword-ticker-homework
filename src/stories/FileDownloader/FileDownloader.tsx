import React, { useEffect, useRef } from "react";
import type { File } from "./models/model";
import styles from "./FileDownloader.module.css";
import { FileRow } from "./components/FileRow";
import { useSelection } from "./hooks/useSelection";
import downloadIcon from "./assets/icon-download.png";

interface FileDownloaderProps {
  files: File[];
}

export const FileDownloader: React.FC<FileDownloaderProps> = ({ files }) => {
  const {
    selectedFiles,
    isAllSelected,
    isSomeSelected,
    isAnySelected,
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
    const selectedFileDetails = Array.from(selectedFiles)
      .map((file) => {
        return `${file.device} - ${file.path}`;
      })
      .join("\n");

    alert(selectedFileDetails);
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
            disabled={files.length === 0}
          />
          {isAnySelected ? `Selected ${selectedFiles.size}` : "None Selected"}
        </div>

        <button
          className={styles.downloadButton}
          onClick={downloadSelected}
          disabled={!isAnySelected}
        >
          <img
            src={downloadIcon}
            alt="download-icon"
            className={!isAnySelected ? styles.downloadIconDisabled : ""}
          />
          Download Selected
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <div className={styles.checkbox}></div>
            </th>
            <th>
              <div className={styles.name}>Name</div>
            </th>
            <th>
              <div className={styles.device}>Device</div>
            </th>
            <th>
              <div className={styles.path}>Path</div>
            </th>
            <th>
              <div className={styles.status}>Status</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <FileRow
              key={file.name}
              file={file}
              isSelected={selectedFiles.has(file)}
              onSelectionChange={(file) => {
                toggleSelection(file);
              }}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
