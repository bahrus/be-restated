# be-restated

*be-restated* is one of a trio of element decorators / behaviors that takes advantage of the buried treasure that is XSLT, built into the browser.

The differences are summarized in the table below.

Bottom line, *be-restated* focuses on the following problem statements:

1.  Extracting the data from server-rendered HTML, in partnership with [obj-xml](https://github.com/bahrus/obj-ml).
2.  Providing derived content from other content.  For example, generating a table of contents based on the contents of the page.

<table>
    <caption>The roles of be-restated, be-metamorphic, be-ferried</caption>
    <thead>
        <tr>
            <th>Decorator/behavior</th>
            <th>Problem statements</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href=https://github.com/bahrus/be-restated>be-restated</a></td>
            <td>
                <ol>
                    <li>Extracting the data from server-rendered HTML, in partnership with <a href=https://github.com/bahrus/obj-ml target=_blank>obj-xml</a></li>
                    <li>Providing derived content from other content.  For example, generating a table of contents based on the contents of the page.</li>
                </ol>
            </td>
            <td></td>
        </tr>
        <tr>
            <td><a href=https://github.com/bahrus/be-metamorphic>be-metamorphic</a></td>
            <td>
                <ol>
                    <li>Replace existing content with structurally different content.</li>
                    <li>Replace HTML optimized for first paint, composed of native HTML elements, with markup consisting of design library tags, once the design library has been downloaded</li>
                </ol>
            </td>
            <td></td>
        </tr>
        <tr>
            <td><a href=https://github.com/bahrus/be-ferried>be-ferried</a></td>
            <td>
                <ol>
                    <li>Make a replica of the light children, and transform it into the markup that makes sense within the Shadow DOM realm.</li>
                </ol>
            </td>
        </tr>
    </tbody>
</table>

## Syntax

```html
<table-of-contents be-restated='{
    "from": "main",
    "xslt": "toc.xslt"
}'>
</table-of-contents>
...
<main>
    <h1>Heading 1</h1>
    <section>
        <h2>Heading 2</h2>
    </section>
    <section>...</section>
    <template be-a-beacon></template>
</main>
```

What this does:

1.  If be-restated can't locate main, it attaches an event handler to the host or document.body, listening for the event be-a-beacon emits:  "i-am-here".  Every time such an event occurs, searches the host's Shadow DOM, or document.body for element "main".
2.  Once element "main" is found, moves the beacon event listener to the main element.
3.  If the template[be-a-beacon] element is found, xslt is performed with the content of the main element, and the table-of-contents light children are populated from the result.
4.  If the event handler on the main element picks up "i-am-here" messages going forward, it re-does step 3.