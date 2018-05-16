import {AsyncTest, Expect, Test, TestFixture} from "alsatian";
import { SearchBar } from "../src/components/Search/SearchBar";

@TestFixture()
export class SearchBarTests {
    @Test()
    public shouldBeTwo() {
        Expect(1 + 2).toBe(3);
    }
}
