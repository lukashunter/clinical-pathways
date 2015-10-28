//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2015.10.14 at 11:07:43 PM CEST 
//


package pl.truba.cp.bean.v21;

import java.util.HashMap;
import java.util.Map;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAnyAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.namespace.QName;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice>
 *         &lt;element ref="{http://www.wfmc.org/2008/XPDL2.1}StartEvent" minOccurs="0"/>
 *         &lt;element ref="{http://www.wfmc.org/2008/XPDL2.1}IntermediateEvent" minOccurs="0"/>
 *         &lt;element ref="{http://www.wfmc.org/2008/XPDL2.1}EndEvent" minOccurs="0"/>
 *       &lt;/choice>
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
    "startEvent",
    "intermediateEvent",
    "endEvent"
})
@XmlRootElement(name = "Event")
public class Event {

    @XmlElement(name = "StartEvent")
    protected StartEvent startEvent;
    @XmlElement(name = "IntermediateEvent")
    protected IntermediateEvent intermediateEvent;
    @XmlElement(name = "EndEvent")
    protected EndEvent endEvent;
    @XmlAnyAttribute
    private Map<QName, String> otherAttributes = new HashMap<QName, String>();

    /**
     * Gets the value of the startEvent property.
     * 
     * @return
     *     possible object is
     *     {@link StartEvent }
     *     
     */
    public StartEvent getStartEvent() {
        return startEvent;
    }

    /**
     * Sets the value of the startEvent property.
     * 
     * @param value
     *     allowed object is
     *     {@link StartEvent }
     *     
     */
    public void setStartEvent(StartEvent value) {
        this.startEvent = value;
    }

    /**
     * Gets the value of the intermediateEvent property.
     * 
     * @return
     *     possible object is
     *     {@link IntermediateEvent }
     *     
     */
    public IntermediateEvent getIntermediateEvent() {
        return intermediateEvent;
    }

    /**
     * Sets the value of the intermediateEvent property.
     * 
     * @param value
     *     allowed object is
     *     {@link IntermediateEvent }
     *     
     */
    public void setIntermediateEvent(IntermediateEvent value) {
        this.intermediateEvent = value;
    }

    /**
     * Gets the value of the endEvent property.
     * 
     * @return
     *     possible object is
     *     {@link EndEvent }
     *     
     */
    public EndEvent getEndEvent() {
        return endEvent;
    }

    /**
     * Sets the value of the endEvent property.
     * 
     * @param value
     *     allowed object is
     *     {@link EndEvent }
     *     
     */
    public void setEndEvent(EndEvent value) {
        this.endEvent = value;
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