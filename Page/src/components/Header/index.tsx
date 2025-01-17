import { useState } from "react";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { HeaderContainerProps, HeaderItem } from "./@types";
import { Container, MenuIcon, HeaderGroup, HeaderList, HeaderListItem, IconsCont } from "./styles";
import { SwitchThemeMode } from "../SwitchThemeMode";

const headerItems: HeaderItem[] = [
  { id: 0, title: "Início", to: 'inicio' },
  { id: 1, title: "Sobre", to: 'sobre' },
  { id: 2, title: "Projetos", to: 'projetos' },
  { id: 3, title: "Posts", to: 'posts' }
];

const HeaderContainer = ({ menuIsOpen, setMenuIsOpen, children }: HeaderContainerProps) => (
  <Container className={`${menuIsOpen && 'active'}`} data-testid="header-container">
    <MenuIcon 
      onClick={() => setMenuIsOpen(!menuIsOpen)} 
      className={`${menuIsOpen && 'active'}`} 
      data-testid="menu-icon"
    >
      {!menuIsOpen ? <GiHamburgerMenu/> : <IoCloseSharp/>}
    </MenuIcon>
    {children}
  </Container>
);

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <HeaderContainer {...{menuIsOpen, setMenuIsOpen}}>
      <HeaderGroup>
        <HeaderList>
          {headerItems.map((item) => (
            <HeaderListItem key={item.id} data-testid="header-list-item">
              <Link
                to={`${item.to}`}
                activeClass="active"
                spy={true}
                smooth={true}
                duration={500}
              >
                {item.title}
              </Link>
            </HeaderListItem>
          ))}
        </HeaderList>
        <IconsCont>
          <SwitchThemeMode data-testid="theme-switch" />
        </IconsCont>
      </HeaderGroup>
    </HeaderContainer>
  );
};
