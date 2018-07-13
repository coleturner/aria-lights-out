import 'jest-localstorage-mock';
import initStoryshots, {
  multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';
import * as emotion from 'emotion';
import { createSerializer } from 'jest-emotion';

initStoryshots({
  serializer: createSerializer(emotion),
  test: multiSnapshotWithOptions({}),
});
