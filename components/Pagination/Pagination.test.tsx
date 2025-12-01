import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders pagination when totalPages > 1", () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("does not render when totalPages <= 1", () => {
    const { container } = render(<Pagination page={1} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders previous button when page > 1", () => {
    render(<Pagination page={2} totalPages={5} />);
    const prevLink = screen.getByLabelText("Go to previous page");
    expect(prevLink).toBeInTheDocument();
    expect(prevLink).toHaveAttribute("href", "/1");
  });

  it("does not render previous button on first page", () => {
    render(<Pagination page={1} totalPages={5} />);
    const prevLink = screen.queryByLabelText("Go to previous page");
    expect(prevLink).not.toBeInTheDocument();
  });

  it("renders next button when page < totalPages", () => {
    render(<Pagination page={1} totalPages={5} />);
    const nextLink = screen.getByLabelText("Go to next page");
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute("href", "/2");
  });

  it("does not render next button on last page", () => {
    render(<Pagination page={5} totalPages={5} />);
    const nextLink = screen.queryByLabelText("Go to next page");
    expect(nextLink).not.toBeInTheDocument();
  });

  it("uses custom basePath correctly", () => {
    render(<Pagination page={2} totalPages={5} basePath="/favorites" />);
    const prevLink = screen.getByLabelText("Go to previous page");
    expect(prevLink).toHaveAttribute("href", "/favorites/1");
  });
});
