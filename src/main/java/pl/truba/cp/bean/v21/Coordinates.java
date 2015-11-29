//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2015.10.14 at 11:07:43 PM CEST 
//


package pl.truba.cp.bean.v21;

import java.math.BigDecimal;
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
import javax.xml.namespace.QName;

import com.fasterxml.jackson.annotation.JsonProperty;
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
 *       &lt;attribute name="XCoordinate" type="{http://www.w3.org/2001/XMLSchema}double" />
 *       &lt;attribute name="YCoordinate" type="{http://www.w3.org/2001/XMLSchema}double" />
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
@XmlRootElement(name = "Coordinates")
public class Coordinates {

    @XmlAnyElement(lax = true)
    protected List<java.lang.Object> any;
    @JsonProperty("x")
    @XmlAttribute(name = "XCoordinate")
    protected Double xCoordinate;
    @JsonProperty("y")
    @XmlAttribute(name = "YCoordinate")
    protected Double yCoordinate;
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
     * Gets the value of the xCoordinate property.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getXCoordinate() {
        return xCoordinate;
    }

    /**
     * Sets the value of the xCoordinate property.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setXCoordinate(Double value) {
        this.xCoordinate = value;
    }

    /**
     * Gets the value of the yCoordinate property.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getYCoordinate() {
        return yCoordinate;
    }

    /**
     * Sets the value of the yCoordinate property.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setYCoordinate(Double value) {
        this.yCoordinate = value;
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
