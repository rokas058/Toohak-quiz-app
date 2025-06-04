import { render, screen } from "@testing-library/react";
import { vi, expect, test, describe, Mock } from "vitest";
import { BrowserRouter } from "react-router-dom"; // Navbar uses links and needs this to work
import Navbar from "../Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { userEvent } from "@testing-library/user-event";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { useTranslation } from "react-i18next";

vi.mock("react-i18next");
vi.mock("@auth0/auth0-react");

const mockedUseAuth0 = useAuth0 as Mock;
const mockedUseTranslation = useTranslation as Mock;
mockedUseTranslation.mockReturnValue({ t: (output: string) => output }); // Bypasses NO_I18NEXT_INSTANCE error

describe("Navbar tests", () => {
  describe("NavItem tests", () => {
    test("Set userNavItems on login (login, create, my quizzes))", () => {
      mockedUseAuth0.mockReturnValue({ isAuthenticated: true }); // Auth bypass

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );

      expect
        .soft(
          screen.queryByRole("button", { name: "navbar_logout" }),
          "Logout button was not found after login",
        )
        .not.toBeNull();
      expect
        .soft(
          screen.queryByRole("link", { name: "navbar_create" }), // Routes are treated as links
          "Create button was not found after login",
        )
        .not.toBeNull();
      expect
        .soft(
          screen.queryByRole("link", { name: "navbar_myquizzes" }),
          "My Quizzes button was not found after login",
        )
        .not.toBeNull();
    });

    test("Set guestNavItems on logout", () => {
      mockedUseAuth0.mockReturnValue({ isAuthenticated: false });

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );

      expect(
        screen.queryByRole("button", { name: "navbar_login" }),
        "Login button was not found after logout",
      ).not.toBeNull();
    });
  });

  // Login and logout buttons should have their own test files

  describe("Button press tests", () => {
    test("Press My Quizzes", async () => {
      mockedUseAuth0.mockReturnValue({ isAuthenticated: true });
      const user = userEvent.setup();

      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );

      await user.click(screen.getByRole("link", { name: "navbar_myquizzes" }));
      expect(
        window.location.pathname,
        "My Quizzes went to the wrong path",
      ).toBe(PrivateAppRoutes.USER_QUIZZES);
    });
    test("Press Create", async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>,
      );
      await user.click(screen.getByRole("link", { name: "navbar_create" }));
      expect(window.location.pathname, "Create went to the wrong path").toBe(
        PrivateAppRoutes.CREATE_QUIZ,
      );
    });
  });
});
