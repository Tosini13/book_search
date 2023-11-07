import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import BookIcon from "../icons/BookIcon";
import { useTheme } from "@emotion/react";

export const imageState = {
  ERROR: "ERROR",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  EMPTY: "EMPTY",
} as const;

type ImageStateType = (typeof imageState)[keyof typeof imageState];

const ImageStyled = styled.img<{ state: ImageStateType }>`
  width: 100%;
  aspect-ratio: 2/3;
  z-index: 1;
  position: relative;
  opacity: 1;
  transition-property: scale, opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  ${(props) =>
    (imageState.LOADING === props.state || imageState.ERROR === props.state) &&
    "opacity: 0;"}
`;

const LabelStyled = styled.p`
  color: ${(props) => props.theme.color.disabled};
  text-align: center;
  font-size: 0.8rem;
  position: absolute;
  bottom: 10%;
  left: 0;
  width: 100%;
`;

const LogoContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: grid;
  place-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

type ImagePropsType = {
  imgSrc?: string;
  alt: string;
};

const Image: React.FC<ImagePropsType> = ({ imgSrc, alt }) => {
  const [state, setState] = useState<ImageStateType>(() =>
    imgSrc ? imageState.LOADING : imageState.EMPTY
  );

  const theme = useTheme();

  const stateIcon = {
    [imageState.ERROR]: (
      <LogoContainer data-testid="error_icon">
        <BookIcon color={theme.color.error} />
        <LabelStyled>Could not load the image</LabelStyled>
      </LogoContainer>
    ),
    [imageState.LOADING]: (
      <LogoContainer data-testid="loading_icon">
        <BookIcon color={theme.color.primary} />
      </LogoContainer>
    ),
    [imageState.SUCCESS]: null,
    [imageState.EMPTY]: (
      <LogoContainer data-testid="no_img_icon">
        <BookIcon color={theme.color.disabled} />
      </LogoContainer>
    ),
  }[state];

  return (
    <div
      data-testid="image"
      className={css`
        relative;
        width: 100%;
        aspect-ratio: 2/3;
      `}
    >
      {stateIcon}
      {imageState.EMPTY !== state && (
        <ImageStyled
          src={imgSrc}
          alt={alt}
          data-testid="image-img"
          state={state}
          onLoad={() => setState(imageState.SUCCESS)}
          onError={(e) => setState(imageState.ERROR)}
        />
      )}
    </div>
  );
};

export default Image;
