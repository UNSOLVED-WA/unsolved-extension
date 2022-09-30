import styled from '@emotion/styled';

type Props =
  | {
      color: string;
    }
  | {};

const Divider = styled.div<Props>`
  width: 80%;
  height: 1px;
  background: ${(props) => props.color || '#ffffff'};
`;

export default Divider;
