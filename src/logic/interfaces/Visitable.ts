import Visitor from "../visitors/Visitor";

interface Visitable {
    accept(visitor: Visitor): void;
}
export default Visitable;