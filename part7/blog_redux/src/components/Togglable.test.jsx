import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";
import { beforeEach } from "vitest";

describe("<Toggable />", () => {
  beforeEach(() => {
    render(
      <Togglable title='show inner'>
        <div>{"Text in parent"}</div>
      </Togglable>
    );
  });

  test("render its children", () => {
    const element = screen.getByText("Text in parent");
    expect(element).toBeDefined();
  });

  test("children is not visible at start", () => {
    const element = screen.getByText("Text in parent");
    expect(element).not.toBeVisible();
  });

  test("children is visible after user click button show", async() => {
    const user = userEvent.setup();
    const button = screen.getAllByText("show inner")[0];
    await user.click(button);
    const element = screen.getByText("Text in parent");
    expect(element).toBeVisible();
  });

  test("toggled content can be closed", async() => {
    const user = userEvent.setup();
    const button = screen.getAllByText("show inner")[0];
    await user.click(button);
    const button1 = screen.getAllByText("cancel")[0];
    await user.click(button1);
    const element = screen.getByText("Text in parent");
    expect(element).not.toBeVisible();
  })
});
