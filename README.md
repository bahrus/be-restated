# be-restated

*be-restated* is one of a trio of element decorators / behaviors that takes advantage of the buried treasure that is XSLT, built into the browser.

The differences are summarized in the table below.

Bottom line, *be-restated* focuses on the following problem statements:

1.  Extracting the data from server-rendered HTML, in partnership with [obj-xml](https://github.com/bahrus/obj-ml).
2.  Providing derived content from other content.  For example, generating a table of contents based on the contents of the page.

<table>
    <caption>The roles of be-restarted, be-metamorphic, be-ferried</caption>
    <thead>
        <tr>
            <th>Decorator/behavior</th>
            <th>Problem statements</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>be-restated</td>
            <td>
                <ol>
                    <li>Extracting the data from server-rendered HTML, in partnership with <a href=https://github.com/bahrus/obj-ml target=_blank>obj-xml</a></li>
                    <li>Providing derived content from other content.  For example, generating a table of contents based on the contents of the page.</li>
                </ol>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>be-metamorphic</td>
            <td>
                <ol>
                    <li>Replace existing content with structurally different content.</li>
                    <li>Replace HTML optimized for first paint, composed of native HTML elements, with markup consisting of design library tags, once the design library has been downloaded</li>
                </ol>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>be-ferried</td>
            <td>
                <ol>
                    <li>Make a replica of the light children, and transform it into the markup that makes sense within the Shadow DOM</li>
                </ol>
            </td>
        </tr>
    </tbody>
</table>