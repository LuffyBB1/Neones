import React from 'react';
import {
    Form, Field, Label, Input, FormGroup, Required, SubmitButton
} from './PurchaseForm.styles.js';


const PurchaseForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Field>
                <Label>Nombre <Required>*</Required></Label>
                <Input type="text" required />
            </Field>

            <FormGroup>
                <Field>
                    <Label>Correo electrónico <Required>*</Required></Label>
                    <Input type="email" required />
                </Field>
                <Field>
                    <Label>Número de teléfono <Required>*</Required></Label>
                    <Input type="tel" required />
                </Field>
            </FormGroup>

            <Field>
                <Label>Dirección de envío <Required>*</Required></Label>
                <Input type="text" placeholder="Calle y número" required />
            </Field>

            <FormGroup>
                <Field>
                    <Input type="text" placeholder="Código postal" />
                </Field>
                <Field>
                    <Input type="text" placeholder="Ciudad" />
                </Field>
                <Field>
                    <Input type="text" placeholder="País" />
                </Field>
            </FormGroup>

            <Field>
                <Label>¿Desea factura? <Required>*</Required></Label>
                <Input type="text" defaultValue="No" required />
            </Field>

            <SubmitButton type="submit">Enviar</SubmitButton>
        </Form>
    );
};

export default PurchaseForm;