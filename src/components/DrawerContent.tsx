import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthActions } from "../state/actions/useAuthActions";
import {
  AssignmentOutlined,
  DashboardOutlined,
  EngineeringOutlined,
  LogoutOutlined,
  PeopleAltOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Logo_Vanguardia from "../assets/images/Logo_Vanguardia.png";

const MODULES = [
  { name: "Dashboard", path: "/home/dashboard", icon: <DashboardOutlined /> },
  { name: "Clients", path: "/home/clients", icon: <PeopleAltOutlined /> },
  {
    name: "Technicians",
    path: "/home/technicians",
    icon: <EngineeringOutlined />,
  },
  {
    name: "Tareas",
    path: "/home/tasks",
    icon: <AssignmentOutlined />,
  },
  {
    name: "Rutinas de vigilancia",
    path: "/home/surveillance",
    icon: <VisibilityOutlined />,
  },
];

export const DrawerContent = () => {
  const navigate = useNavigate();
  const { logout } = useAuthActions();
  const location = useLocation();

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        open
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1E1E2F",
            color: "white",
            paddingTop: 2,
          },
        }}
      >
        <Box width={250} role="presentation">
          <div className="flex justify-center">
            <img
              src={Logo_Vanguardia}
              alt="Logo Vanguardia"
              style={{ width: 140 }}
            />
          </div>

          <hr className="border-[#D9D9D9] m-2 " />

          <List>
            {MODULES.map(({ name, path, icon }) => {
              const isActive = location.pathname === path;
              return (
                <ListItem key={name} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(path, { replace: true })}
                    sx={{
                      "&:hover": { backgroundColor: "#2A2A3A" },
                      transition: "all 0.3s ease-in-out",
                      backgroundColor: isActive ? "#2196f3" : "transparent",
                      borderRadius: isActive ? "10px" : "0",
                      padding: isActive ? "12px 20px" : "8px 16px",
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box mt="auto" p={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutOutlined />}
            onClick={logout}
            sx={{ width: "100%" }}
          >
            Salir
          </Button>
        </Box>
      </Drawer>

      <Box
        component="main"
        p={2}
        minHeight="100vh"
        minWidth="82vw"
        marginLeft={30}
      >
        <>
          <Outlet />
        </>
      </Box>
    </Box>
  );
};
