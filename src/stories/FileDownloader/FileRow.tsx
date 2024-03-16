import styles from "./FileRow.module.css";
import type { File } from "./model";

interface FileRowProps {
  file: File;
  isSelected: boolean;
  onSelectionChange: (file: File) => void;
}

export const FileRow: React.FC<FileRowProps> = ({
  file,
  isSelected,
  onSelectionChange,
}) => {
  const isAvailable = file.status === "available";
  const onClickRow = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (isAvailable) {
      onSelectionChange(file);
    }
  };

  return (
    <tr className={`${isSelected ? styles.trSelected : styles.trNormal}`}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onClickRow}
          disabled={!isAvailable}
        />
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td>{file.status}</td>
    </tr>
  );
};
