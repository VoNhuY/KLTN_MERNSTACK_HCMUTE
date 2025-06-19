// dayjs-config.js

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Kích hoạt plugin để parse theo định dạng tùy chỉnh
dayjs.extend(customParseFormat);

export default dayjs;
