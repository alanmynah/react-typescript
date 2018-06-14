import {AsyncTest, Expect, Test, TestFixture, TestCase} from "alsatian";
import { validate } from "../src/public/components/Forms/validate";

@TestFixture()
export class ValidateTests {
    @TestCase("o'driscoll", true)
    @TestCase("o-driscoll", true)
    @TestCase("O'driScoll", true)
    @TestCase("O-driScoll", true)
    @TestCase("'driscoll", true)
    @TestCase("-driscoll", true)
    @TestCase("o'driscoll-", true)
    @TestCase("o'driscoll'", true)
    @TestCase("o'dr1scoll", false)
    @TestCase("1o@driscoll", false)
    @TestCase("o@driscoll1", false)
    @TestCase("o/driscoll", false)
    @TestCase("o*driscoll", false)
    @Test()
    public ValidString(testString: string, expected: boolean) {
        const validated = validate(testString);
        Expect(validated).toBe(expected);
    }
}
