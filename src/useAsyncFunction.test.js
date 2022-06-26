import React from "react";
import { render } from "@testing-library/react";
import useAsyncFunction from "./useAsyncFunction";
import { act } from "react-dom/test-utils";

var result;

const TestComponent = ({ hook }) => {
  result = hook();
  return <test-hookComponent />;
};

it("should return error on Promise reject", async () => {
  const errorMessage = "error-useAsyncFunction";

  await act(async () =>
    render(
      <TestComponent
        hook={() => useAsyncFunction(() => Promise.reject(errorMessage))}
      />
    )
  );

  expect(result.errorMessage).toEqual(errorMessage);
  expect(result.data).toEqual([]);
  expect(result.isLoading).toEqual(false);
});

it("should return data on Promise resolve", async () => {
  const data = [1, 2, 3, 4, 5];

  await act(async () =>
    render(
      <TestComponent
        hook={() => useAsyncFunction(() => Promise.resolve(data))}
      />
    )
  );

  expect(result.errorMessage).toEqual(null);
  expect(result.data).toEqual(data);
  expect(result.isLoading).toEqual(false);
});

it("should return loading", async () => {
  const data = [1, 2, 3, 4, 5];

  render(
    <TestComponent hook={() => useAsyncFunction(() => Promise.resolve(data))} />
  );

  expect(result.errorMessage).toEqual(null);
  expect(result.data).toEqual([]);
  expect(result.isLoading).toEqual(true);
});
