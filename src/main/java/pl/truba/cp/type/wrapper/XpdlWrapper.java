package pl.truba.cp.type.wrapper;

import pl.truba.cp.bean.v21.Activity;
import pl.truba.cp.bean.v21.PackageType;
import pl.truba.cp.bean.v21.Transition;

import java.util.List;

/**
 * Created by Łukasz on 2015-11-24.
 */
public class XpdlWrapper {
    PackageType packageType;
    List<Activity> activities;
    List<Transition> transitions;

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public List<Transition> getTransitions() {
        return transitions;
    }

    public void setTransitions(List<Transition> transitions) {
        this.transitions = transitions;
    }
}
