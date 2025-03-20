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
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthActions } from "../state/actions/useAuthActions";
import {
  DashboardOutlined,
  EngineeringOutlined,
  LogoutOutlined,
  PeopleAltOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Logo_Vanguardia from "../assets/images/Logo_Vanguardia.png";

const modules = [
  { name: "Dashboard", path: "/home/dashboard", icon: <DashboardOutlined /> },
  { name: "Clients", path: "/home/clients", icon: <PeopleAltOutlined /> },
  {
    name: "Technicians",
    path: "/home/technicians",
    icon: <EngineeringOutlined />,
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
              style={{ width: 150 }}
            />
          </div>

          <hr className="border-[#D9D9D9] m-2 " />

          <List>
            {modules.map(({ name, path, icon }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => navigate(path)}
                  sx={{
                    "&:hover": { backgroundColor: "#2A2A3A" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
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
        flexGrow={1}
        p={3}
        minHeight="100vh"
        minWidth="100vw"
      >
        <Outlet />
      </Box>
    </Box>
  );
};
