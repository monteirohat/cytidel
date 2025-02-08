// src/utils/IconMapper.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import HailIcon from "@mui/icons-material/Hail";
import TabletIcon from "@mui/icons-material/Tablet";
import BadgeIcon from "@mui/icons-material/Badge";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PeopleIcon from "@mui/icons-material/People";
import ClenteIcon from "@mui/icons-material/People";
import HandIcon from "@mui/icons-material/Handshake";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import ExitIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import UserIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Key";
import RuleIcon from "@mui/icons-material/Rule";

/**
 * Retorna o componente de ícone de acordo com o nome passado.
 * @param {string} iconName - Nome do ícone (por ex. "HailIcon", "TabletIcon", etc.)
 * @returns {JSX.Element} - Componente MUI de ícone.
 */
export function getIconComponent(iconName) {
  switch (iconName) {
    case "HailIcon":
      return HailIcon;
    case "TabletIcon":
      return TabletIcon;
    case "BadgeIcon":
      return BadgeIcon;
    case "InterpreterModeIcon":
      return InterpreterModeIcon;
    case "ChecklistIcon":
      return ChecklistIcon;
    case "PeopleIcon":
      return PeopleIcon;
    case "RuleIcon":
      return RuleIcon;
    case "SettingsIcon":
      return SettingsIcon;
    default:
      // Se não encontrou o nome, retorna o Dashboard como fallback
      return DashboardIcon;
  }
}
