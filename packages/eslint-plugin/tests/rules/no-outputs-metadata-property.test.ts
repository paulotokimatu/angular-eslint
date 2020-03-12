import rule, {
  MessageIds,
  RULE_NAME,
} from '../../src/rules/no-outputs-metadata-property';
import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '../test-helper';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const messageId: MessageIds = 'noOutputsMetadataProperty';

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `
    @Component({
      selector: 'app-test',
      template: 'Hello'
    })
    class TestComponent {}
`,
    `
    @Directive({
      selector: 'app-test'
    })
    class TestDirective {}
`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'it should fail if "outputs" metadata property is used in @Component',
      annotatedSource: `
        @Component({
          outputs: [
          ~~~~~~~~~~
            'id: foo'
          ],
          ~
          selector: 'app-test'
        })
        class TestComponent {}
      `,
      messageId,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'it should fail if "outputs" metadata property is used in @Directive',
      annotatedSource: `
        @Directive({
          outputs: [
          ~~~~~~~~~~
            'id: foo'
          ],
          ~
          selector: 'app-test'
        })
        class TestDirective {}
      `,
      messageId,
    }),
  ],
});
