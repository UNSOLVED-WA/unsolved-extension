import styled from '@emotion/styled';

type Props =
  | {
      color: string;
    }
  | Record<string, unknown>;

const Divider = styled.div<Props>`
  width: 80%;
  height: 1px;
  background: ${({ color }) => color || '#ffffff'};
`;

export default Divider;
