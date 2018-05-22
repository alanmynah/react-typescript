import {AsyncTest, Expect, Test, TestFixture} from "alsatian";
import { debug } from "util";
import { SearchBar } from "../src/components/Search/SearchBar";
// tslint:disable-next-line:no-var-requires
const MockFetch = require("mock-fetch-api");

@TestFixture()
export class SearchBarTests {
    @Test()
    public async handles404() {
        MockFetch.when("GET", "https://api.github.com/").respondWith(404);

        const response = await fetch("https://api.github.com/");
        Expect(response.status).toBe(0);
    }

    @Test()
    public shouldBeTwo() {
        Expect(1 + 2).toBe(3);
    }
}
