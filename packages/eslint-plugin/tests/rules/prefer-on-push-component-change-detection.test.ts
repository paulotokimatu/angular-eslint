import rule, {
  MessageIds,
  RULE_NAME,
} from '../../src/rules/prefer-on-push-component-change-detection';
import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '../test-helper';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const messageId: MessageIds = 'preferOnPushComponentChangeDetection';

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // should succeed if ChangeDetectionStrategy.OnPush is set
    `
    @Component({
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    class Test {}
    `,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'should fail if ChangeDetectionStrategy.Default is set',
      annotatedSource: `
      @Component({
        changeDetection: ChangeDetectionStrategy.Default
                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      })
      class Test {}
      `,
      messageId,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail if no ChangeDetectionStrategy is explicitly set',
      annotatedSource: `
      @Component({
      ~~~~~~~~~~~~
        selector: 'foo'
      })
      ~~
      class Test {}
      `,
      messageId,
    }),
  ],
});
