import styled from '@emotion/styled';
import { Button } from 'antd';

import { TAntdToken } from '../types/tst.type';
import { styledOmit$PropsOptions } from '../utils';

const SoftButton = styled(
  Button,
  styledOmit$PropsOptions,
)<TAntdToken>(({ $token }) => ({
  backgroundColor: `${$token.colorPrimary}25`,
  color: $token.colorPrimary,
}));

export default SoftButton;
