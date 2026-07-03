// Mapa de iconos por nombre (los archivos de /data referencian iconos por string).
import {
  Briefcase,
  Mail,
  Palette,
  Server,
  Wrench,
  Phone,
  MapPin,
  PenTool,
  Code2,
  Terminal,
  Database,
  Layers,
  Boxes,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const icons = {
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
  Briefcase,
  Mail,
  Palette,
  Server,
  Wrench,
  Phone,
  MapPin,
  PenTool,
  Code2,
  Terminal,
  Database,
  Layers,
  Boxes,
  Cpu,
  Sparkles,
};

export const getIcon = (name) => icons[name] ?? Mail;
