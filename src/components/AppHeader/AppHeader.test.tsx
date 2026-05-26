import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "../../i18n";
import { osapiens } from "../../themes/index";
import AppHeader from "./index";
import userEvent from "@testing-library/user-event";
import * as i18next from "i18next";

const renderWithProviders = (user: any) => {
  return render(
    <ThemeProvider theme={osapiens.light}>
      <I18nextProvider i18n={i18n}>
        <AppHeader user={user} pageTitle="Test" />
      </I18nextProvider>
    </ThemeProvider>,
  );
};

describe("AppHeader Component", () => {
  afterEach(()=>{
    jest.useRealTimers();
  })
  test("avatar is not shown when user is null", () => {
    renderWithProviders(null);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("avatar is shown when user exists", () => {
    renderWithProviders({
      eMail: "ibrahim@test.com",
      firstName: "Ibrahim",
      lastName: "Munna",
    });
    expect(screen.getByText("IM")).toBeInTheDocument();
  });

  test('countdown decrements by 1 every second', ()=>{
    jest.useFakeTimers();
    renderWithProviders(null);

    expect(screen.getByText('60:00')).toBeInTheDocument()

    act(()=>{jest.advanceTimersByTime(1000);})
    expect(screen.getByText('59:59')).toBeInTheDocument();

    act(()=>{jest.advanceTimersByTime(1000 * 10);})
    expect(screen.getByText('59:49')).toBeInTheDocument();

    jest.useRealTimers();
  });

  test('countdown stops at 00:00 and never goes negative', ()=>{
    jest.useFakeTimers();
    renderWithProviders(null);

    act(()=>{jest.advanceTimersByTime(1000 * 3600)})
    expect(screen.getByText('00:00')).toBeInTheDocument()

    act(()=>{jest.advanceTimersByTime(1000 * 10)})
    expect(screen.getByText("00:00")).toBeInTheDocument()

    jest.useRealTimers();
  })

  test('EN language button calls with "en"', async () => {
    const spy = jest.spyOn(i18next.default, "changeLanguage");
    renderWithProviders(null);
    await userEvent.click(screen.getByText("EN"));
    expect(spy).toHaveBeenCalledWith("en");
    spy.mockRestore();
  });

  test('DE language button calls with "de"', async () => {
    const spy = jest.spyOn(i18next.default, "changeLanguage");
    renderWithProviders(null);
    await userEvent.click(screen.getByText("DE"));
    expect(spy).toHaveBeenCalledWith("de");
    spy.mockRestore();
  });
});
