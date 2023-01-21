import styled from '@emotion/styled';

const Recommand = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  .problem-id,
  .problem-tier {
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
  }
  .problem-title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default Recommand;
