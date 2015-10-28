//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2015.10.14 at 11:07:43 PM CEST 
//


package pl.truba.cp.bean.v21;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAnyAttribute;
import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.namespace.QName;
import org.w3c.dom.Element;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;any processContents='lax' namespace='##other' maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="GatewayType" default="Exclusive">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}NMTOKEN">
 *             &lt;enumeration value="XOR"/>
 *             &lt;enumeration value="Exclusive"/>
 *             &lt;enumeration value="OR"/>
 *             &lt;enumeration value="Inclusive"/>
 *             &lt;enumeration value="Complex"/>
 *             &lt;enumeration value="AND"/>
 *             &lt;enumeration value="Parallel"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="XORType" default="Data">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}NMTOKEN">
 *             &lt;enumeration value="Data"/>
 *             &lt;enumeration value="Event"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="ExclusiveType" default="Data">
 *         &lt;simpleType>
 *           &lt;restriction base="{http://www.w3.org/2001/XMLSchema}NMTOKEN">
 *             &lt;enumeration value="Data"/>
 *             &lt;enumeration value="Event"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *       &lt;attribute name="Instantiate" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
 *       &lt;attribute name="MarkerVisible" type="{http://www.w3.org/2001/XMLSchema}boolean" default="false" />
 *       &lt;attribute name="IncomingCondition" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="OutgoingCondition" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;anyAttribute processContents='lax' namespace='##other'/>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "any"
})
@XmlRootElement(name = "Route")
public class Route {

    @XmlAnyElement(lax = true)
    protected List<java.lang.Object> any;
    @XmlAttribute(name = "GatewayType")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String gatewayType;
    @XmlAttribute(name = "XORType")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String xorType;
    @XmlAttribute(name = "ExclusiveType")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String exclusiveType;
    @XmlAttribute(name = "Instantiate")
    protected Boolean instantiate;
    @XmlAttribute(name = "MarkerVisible")
    protected Boolean markerVisible;
    @XmlAttribute(name = "IncomingCondition")
    protected String incomingCondition;
    @XmlAttribute(name = "OutgoingCondition")
    protected String outgoingCondition;
    @XmlAnyAttribute
    private Map<QName, String> otherAttributes = new HashMap<QName, String>();

    /**
     * Gets the value of the any property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the any property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAny().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Element }
     * {@link java.lang.Object }
     * 
     * 
     */
    public List<java.lang.Object> getAny() {
        if (any == null) {
            any = new ArrayList<java.lang.Object>();
        }
        return this.any;
    }

    /**
     * Gets the value of the gatewayType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getGatewayType() {
        if (gatewayType == null) {
            return "Exclusive";
        } else {
            return gatewayType;
        }
    }

    /**
     * Sets the value of the gatewayType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setGatewayType(String value) {
        this.gatewayType = value;
    }

    /**
     * Gets the value of the xorType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getXORType() {
        if (xorType == null) {
            return "Data";
        } else {
            return xorType;
        }
    }

    /**
     * Sets the value of the xorType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setXORType(String value) {
        this.xorType = value;
    }

    /**
     * Gets the value of the exclusiveType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExclusiveType() {
        if (exclusiveType == null) {
            return "Data";
        } else {
            return exclusiveType;
        }
    }

    /**
     * Sets the value of the exclusiveType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExclusiveType(String value) {
        this.exclusiveType = value;
    }

    /**
     * Gets the value of the instantiate property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public boolean isInstantiate() {
        if (instantiate == null) {
            return false;
        } else {
            return instantiate;
        }
    }

    /**
     * Sets the value of the instantiate property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setInstantiate(Boolean value) {
        this.instantiate = value;
    }

    /**
     * Gets the value of the markerVisible property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public boolean isMarkerVisible() {
        if (markerVisible == null) {
            return false;
        } else {
            return markerVisible;
        }
    }

    /**
     * Sets the value of the markerVisible property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setMarkerVisible(Boolean value) {
        this.markerVisible = value;
    }

    /**
     * Gets the value of the incomingCondition property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIncomingCondition() {
        return incomingCondition;
    }

    /**
     * Sets the value of the incomingCondition property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIncomingCondition(String value) {
        this.incomingCondition = value;
    }

    /**
     * Gets the value of the outgoingCondition property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getOutgoingCondition() {
        return outgoingCondition;
    }

    /**
     * Sets the value of the outgoingCondition property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setOutgoingCondition(String value) {
        this.outgoingCondition = value;
    }

    /**
     * Gets a map that contains attributes that aren't bound to any typed property on this class.
     * 
     * <p>
     * the map is keyed by the name of the attribute and 
     * the value is the string value of the attribute.
     * 
     * the map returned by this method is live, and you can add new attribute
     * by updating the map directly. Because of this design, there's no setter.
     * 
     * 
     * @return
     *     always non-null
     */
    public Map<QName, String> getOtherAttributes() {
        return otherAttributes;
    }

}
