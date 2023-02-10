// header
type Logo = {
    srcImg: string;
    altText: string;
    link: string;
};

type MenuLink = {
    link: string;
    children: string;
    icon: "home" | "skills" | "projects" | "dashboard" | "edit";
    newTab?: boolean;
};

type Menu = {
    menuLinks?: MeuLink[];
};

type LogoLink = {
    link: string;
    altText: string;
    srcimg?: string;
    newTab?: boolean;
};

type Header = {
    logo: Logo;
} & Menu;

// main
type SideBar = {
    githubURL?: string;
    linkedInURL?: string;
    sizes?: "small" | "medium" | "big";
};

type Section = {
    id: string;
    background?: boolean;
    children: string;
}
