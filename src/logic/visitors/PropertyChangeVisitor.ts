import Visitor from "./Visitor";

class PropertyChangeVisitor implements Visitor {
    visitFunction(func: Function): void {
        console.log('Function visited');
    }
}