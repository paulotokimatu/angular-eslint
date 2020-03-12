import rule, {
  MessageIds,
  RULE_NAME,
} from '../../src/rules/no-output-on-prefix';
import {
  convertAnnotatedSourceToFailureCase,
  RuleTester,
} from '../test-helper';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const messageId: MessageIds = 'noOutputOnPrefix';

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `
    @Component()
    class ButtonComponent {
      @Output() change = new EventEmitter<any>();
    }
`,
    `
    @Component()
    class ButtonComponent {
      @Output() oneProp = new EventEmitter<any>();
    }
      `,
    `
    @Component()
    class SelectComponent {
      @Output() selectionChanged = new EventEmitter<any>();
    }
`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'it should fail when a component output property is named with on prefix',
      annotatedSource: `
        @Component()
        class ButtonComponent {
          @Output() onChange = new EventEmitter<any>();
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
      `,
      messageId,
      data: {
        className: 'ButtonComponent',
        memberName: 'onChange',
      },
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'it should fail when a directive output property is named with on prefix',
      annotatedSource: `
        @Directive()
        class ButtonDirective {
          @Output() onChange = new EventEmitter<any>();
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
      `,
      messageId,
      data: {
        className: 'ButtonDirective',
        memberName: 'onChange',
      },
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'it should fail when a directive output property is named with on prefix',
      annotatedSource: `
        @Directive()
        class ButtonDirective {
          @Output() on = new EventEmitter<any>();
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
      `,
      messageId,
      data: {
        className: 'ButtonDirective',
        memberName: 'on',
      },
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'it should correctly identify the class and member names when the class is exported',
      annotatedSource: `
        @Directive()
        export class ButtonDirective {
          @Output() on = new EventEmitter<any>();
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }
      `,
      messageId,
      data: {
        className: 'ButtonDirective',
        memberName: 'on',
      },
    }),
  ],
});
