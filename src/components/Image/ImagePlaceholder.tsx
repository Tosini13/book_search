import { css } from "@emotion/css";
import styled from "@emotion/styled";
import BookIcon from "../icons/BookIcon";
import { useTheme } from "@emotion/react";

const Shiner = styled.div`
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1s shine linear infinite;
  opacity: 0.7;
  height: 100%;
  width: 100%;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const ImagePlaceholder: React.FC = () => {
  const theme = useTheme();

  return (
    <div
      data-testid="image"
      className={css`
        position: relative;
        width: 100%;
        aspect-ratio: 2/3;
        background-color: #fafafa;
      `}
    >
      <LogoContainer data-testid="loading_icon">
        <BookIcon color={theme.color.primary} />
      </LogoContainer>
      <Shiner />
    </div>
  );
};

export default ImagePlaceholder;
