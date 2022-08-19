<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
    <xsl:for-each select="div/ul">
        <ui5-list style="height: 300px" growing="Scroll">
            <xsl:for-each select="li">
                <ui5-li 
                    icon="nutrition-activity" 
                    description="{span[@slot='description']}" 
                    additional-text="{span[@slot='additional-text']}"
                    additional-text-state="{span[@slot='additional-text-state']}"
                >
                    <xsl:value-of select="node()"/>
                </ui5-li>
            </xsl:for-each>
        </ui5-list>
    </xsl:for-each>
</xsl:template>

</xsl:stylesheet>