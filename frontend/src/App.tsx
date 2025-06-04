import "@assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import CreateQuizPage from "@pages/CreateQuizPage";
import HomePage from "@pages/HomePage.tsx";
import PageNotFound from "@pages/PageNotFound";
import Navbar from "@components/layout/Navbar.tsx";
import QuizList from "@pages/QuizList";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { PublicAppRoutes } from "@models/PublicRoutes";
import QuizSessionPage from "@pages/QuizSessionPage/QuizSessionPage";
import JoinQuizSessionPage from "@pages/JoinQuizSessionPage";
import JoinDirectlyPage from "@pages/JoinDirectlyPage";
import QuizPage from "@pages/QuizPage/QuizPage";
import EditQuizPage from "@pages/EditQuizPage/EditQuizPage";
import RequireAuth from "@components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        {/* PUBLIC ROUTES */}
        <Route path={PublicAppRoutes.HOME} element={<HomePage />} />
        <Route
          path={PublicAppRoutes.PAGE_NOT_FOUND}
          element={<PageNotFound />}
        />
        <Route
          path={PublicAppRoutes.JOIN_SESSION}
          element={<JoinQuizSessionPage />}
        />
        <Route
          path={PublicAppRoutes.JOIN_SESSION_DIRECTLY}
          element={<JoinDirectlyPage />}
        />
        <Route
          path={PublicAppRoutes.QUIZ_SESSION_PAGE}
          element={<QuizSessionPage />}
        />

        {/* PRIVATE ROUTES */}
        <Route element={<RequireAuth />}>
          <Route path={PrivateAppRoutes.USER_QUIZZES} element={<QuizList />} />
          <Route path={PrivateAppRoutes.QUIZ_PAGE} element={<QuizPage />} />
          <Route
            path={PrivateAppRoutes.CREATE_QUIZ}
            element={<CreateQuizPage />}
          />
          <Route
            path={PrivateAppRoutes.EDIT_QUIZ_PAGE}
            element={<EditQuizPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
