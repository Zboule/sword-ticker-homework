import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stories from "./FileDownloader.stories";
import { composeStories } from "@storybook/react";
import '@testing-library/jest-dom'

const { Default } = composeStories(stories);

describe("FileDownloader Component", () => {
  it("renders correctly with provided files", () => {
    render(<Default />);
    const rows = screen.getAllByRole("row");
    // +1 for the header row
    expect(rows.length).toBe(Default.args.files!.length + 1);
  });

  it("displays only available files as selectable", () => {
    render(<Default />);
    const availableFiles = Default.args.files!.filter(
      (file) => file.status === "available"
    );
    const checkboxes = screen.getAllByTestId("download-checkbox");

    const selectableCheckboxes = checkboxes.filter((checkbox) => {
      return !(checkbox as HTMLInputElement).disabled;
    });

    expect(selectableCheckboxes.length).toBe(availableFiles.length);
  });

  it("updates the selection count correctly when files are selected", async () => {
    const user = userEvent.setup();
    render(<Default />);

    const checkboxes = screen.getAllByTestId(
      "download-checkbox"
    ) as HTMLInputElement[];
    const selectableCheckboxes = checkboxes.filter((checkbox) => {
      return !(checkbox as HTMLInputElement).disabled;
    });
    await user.click(selectableCheckboxes[0]);

    expect(screen.getByText(/Selected 1/i)).toBeInTheDocument();
  });

  it("triggers an alert with the correct file path when Download Selected is clicked", async () => {
    const user = userEvent.setup();
    render(<Default />);

    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const firstAvailableCheckbox = checkboxes.find(
      (checkbox, index) => index > 0 && !checkbox.disabled
    );
    if (!firstAvailableCheckbox)
      throw new Error("No available file checkboxes found");

    await user.click(firstAvailableCheckbox);

    const downloadButton = screen.getByRole("button", {
      name: /Download Selected/i,
    });
    await user.click(downloadButton);

    const expectedFile = Default.args.files!.find(
      (file) => file.status === "available"
    );
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining(expectedFile!.path)
    );

    alertMock.mockRestore();
  });
});
