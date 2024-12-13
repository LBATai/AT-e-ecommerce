import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f6fa;
`;

export const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3436;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
  color: #636e72;
  
  span {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e84393;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
  }
`;

export const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dfe6e9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #b2bec3;
  }
`;

export const MainContent = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  height: calc(100vh - 100px);
  position: sticky;
  top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;
export const MenuItem = styled.div.attrs(props => ({
  // Đảm bảo không truyền 'active' xuống DOM
  active: undefined,
}))`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? '#6c5ce7' : '#636e72'};
  background-color: ${props => props.active ? '#f5f3fe' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f3fe;
    color: #6c5ce7;
  }

  span {
    font-weight: ${props => props.active ? '600' : '400'};
  }
`;


export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const StatTitle = styled.h3`
  font-size: 1rem;
  color: #636e72;
  margin-bottom: 0.5rem;
`;

export const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  color: #2d3436;
`;

export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3436;
  margin-bottom: 1.5rem;
`;