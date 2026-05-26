import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import Home from "./index";

describe("Home Component", () => {
  
  afterEach(async () => {
      await act(async () => {
        i18n.changeLanguage("en");
      });
    });
    
  test("renders list items without key warnings", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <I18nextProvider i18n={i18n}>
        <Home />
      </I18nextProvider>,
    );

    const keyWarning = consoleError.mock.calls.some((call) =>
      call[0]?.includes?.('unique "key" prop'),
    );

    expect(keyWarning).toBe(false);

    consoleError.mockRestore();
  });

  test('"known" is rendered as bold text', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Home />
      </I18nextProvider>,
    );
    const bold = container.querySelector("strong");
    expect(bold).toBeInTheDocument();
    expect(bold?.textContent).toMatch(/known/i);
  });

  test('"bekannt" is rendered as bold text in german', async () => {
    await act(async () => {
      i18n.changeLanguage("de");
    });

    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Home />
      </I18nextProvider>,
    );

    const bold = container.querySelector("strong");
    expect(bold).toBeInTheDocument();
    expect(bold?.textContent).toMatch(/bekannt/i);

    //i18n.changeLanguage("en");
  });
});
