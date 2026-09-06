import ModalProvider from "@/components/util/modalProvider";
import Modal from "@/components/ui/modal";
import Form2 from "@/components/ui/form2";
import CategoryProvider from "@/components/util/categoryProvider";
import { Category } from "@/components/ui/category";

export default function Home() {
  return (
    <section className="">
      <ModalProvider>
        <CategoryProvider>
          {/* <Form></Form> */}
          <Modal>
            <Form2></Form2>
          </Modal>
          <div className="h-dvh flex flex-row gap-2 p-2">
            <Category name="1" color="bg-blue-400">
              {/* <Card></Card> */}
            </Category>
            <Category name="2" color="bg-amber-500">
              {/* <div>a</div> */}
            </Category>
            <Category name="3" color="bg-emerald-700">
              {/* <div>a</div> */}
            </Category>
          </div>
        </CategoryProvider>
      </ModalProvider>
    </section>
  );
}







