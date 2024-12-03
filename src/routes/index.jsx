import { createBrowserRouter } from "react-router-dom";
import Levels from "../modules/queens/pages/Levels";
import TangoLevels from "../modules/tango/pages/Levels";
import QueensGame from "../modules/queens/pages/Game";
import Builder from "../modules/queens/pages/Builder";
import Games from "../modules/games/pages/Games";
import TangoGame from "../modules/tango/pages/TangoGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Games />,
  },
  {
    path: "/queens",
    element: <Levels game="queens" />,
  },
  {
    path: "/queens/board/:boardNumber",
    element: <QueensGame />,
  },
  {
    path: "/queens/builder",
    element: <Builder />,
  },
  {
    path: "/tango",
    element: <TangoLevels game="tango" />,
  },
  {
    path: "/tango/board/:boardNumber",
    element: <TangoGame />,
  },
]);

export default router;
